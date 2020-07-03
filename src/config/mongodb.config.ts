import * as mongo from "mongodb";
import * as cosmosdb from "@azure/cosmos";

export class MongoHelper {
  // public static client: mongo.MongoClient;
  public static client: cosmosdb.CosmosClient;

  constructor() {}

  public static connect(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // this.client = new co
      // mongo.MongoClient.connect(
      //   url,
      //   { useNewUrlParser: true, useUnifiedTopology: true },
      //   (err, client: mongo.MongoClient) => {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       MongoHelper.client = client;
      //       resolve(client);
      //     }
      //   }
      // );
    });
  }

  public disconnect(): void {
    // MongoHelper.client.close();
    // MongoHelper.client.
  }
}
