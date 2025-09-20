import 'dotenv/config'
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

console.log("Pinecone API:", process.env.PINECONE_API_KEY?.slice(0,5) + "...");
console.log("Index:", process.env.PINECONE_INDEX);
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// connect with host instead of just index name
const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX, process.env.PINECONE_HOST);

const embedder = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.googe_api_key
});

embedder.embedQuery("ring").then(async (vector) => {
  const vec = await pineconeIndex.upsert([
    {
      id: "test-id",
      values: vector,   
      metadata: {
        text: "metadata",
        username: "text-user",
        useremail: "text-email",
      },
    },
  ]);

  console.log(vec);
});


