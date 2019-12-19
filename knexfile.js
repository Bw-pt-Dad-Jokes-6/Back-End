// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dadjokes.db3' 
    },
    useNullAsDefault: true
  }
};
