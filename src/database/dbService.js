import SQLite from 'react-native-sqlite-storage';

let db;

export const initDB = async () => {
  if (!db) {
    db = await SQLite.openDatabase({
      name: 'records.db',
      location: 'default',
    });
    console.log('✅ Database opened');

    // Create table only (don’t drop on every launch!)
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        builderName TEXT,
        address TEXT,
        buildingName TEXT,
        date TEXT,
        media TEXT
      );
    `);

    console.log('✅ Table ready');
  }
  return db;
};

export const insertRecord = async (
  builderName,
  address,
  buildingName,
  date,
  media = [],
) => {
  if (!db) await initDB(); // ensure DB ready

  const mediaStr = JSON.stringify(media);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO records (builderName, address, buildingName, date, media) VALUES (?, ?, ?, ?, ?);`,
        [builderName, address, buildingName, date, mediaStr],
        (_, result) => {
          console.log('✅ Insert success:', result);
          resolve(result);
        },
        (_, error) => {
          console.log('❌ Insert error:', error);
          reject(error);
          return true;
        },
      );
    });
  });
};

export const fetchRecords = async () => {
  if (!db) await initDB(); // ensure DB ready

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM records ORDER BY id DESC;',
        [],
        (_, { rows }) => {
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            row.media = JSON.parse(row.media || '[]'); // safely parse media
            data.push(row);
          }
          console.log('📌 Records fetched:', data);
          resolve(data);
        },
        (_, error) => reject(error),
      );
    });
  });
};

export const seedDummyData = async () => {
  await initDB();

  const dummyRecords = [
    {
      builderName: 'Alpha Constructions',
      address: '123 Main Street, Delhi',
      buildingName: 'Sunrise Towers',
      date: '11/09/2025',
      media: [],
    },
    {
      builderName: 'Beta Builders',
      address: '45 Market Road, Lucknow',
      buildingName: 'Crystal Heights',
      date: '11/09/2025',
      media: [],
    },
    {
      builderName: 'Gamma Developers',
      address: '78 Lake View Road, Ahmedabad',
      buildingName: 'Silver Residency',
      date: '11/09/2025',
      media: [],
    },
    {
      builderName: 'Delta Developers',
      address: '22 Garden Street, Kolkata',
      buildingName: 'Emerald Valley',
      date: '11/09/2025',
      media: [],
    },
    {
      builderName: 'Epsilon Realty',
      address: '9 River Road, Bangalore',
      buildingName: 'Ocean Breeze Apartments',
      date: '11/09/2025',
      media: [],
    },
  ];

  for (const record of dummyRecords) {
    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM records 
           WHERE builderName = ? AND buildingName = ?;`,
          [record.builderName, record.buildingName],
          (_, { rows }) => {
            if (rows.length === 0) {
              // Only insert if not already present
              insertRecord(
                record.builderName,
                record.address,
                record.buildingName,
                record.date,
                record.media,
              )
                .then(resolve)
                .catch(reject);
            } else {
              console.log(
                `⚡ Skipping duplicate: ${record.builderName} - ${record.buildingName}`,
              );
              resolve();
            }
          },
          (_, error) => reject(error),
        );
      });
    });
  }

  console.log('✅ Dummy records ensured (always present)');
};
