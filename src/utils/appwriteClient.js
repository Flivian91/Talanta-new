import { Client, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Replace with your Appwrite API URL
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Replace with your Appwrite project ID

const databases = new Databases(client);

export { databases, ID };
