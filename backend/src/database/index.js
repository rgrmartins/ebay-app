import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  // Conexão com o banco Não Relacional através do Mongoose
  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
