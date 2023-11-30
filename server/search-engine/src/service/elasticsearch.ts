import { Client } from '@elastic/elasticsearch';

function elasticConnection() {
    // const elasticClient = new Client({ node: process.env.ELASTICSEARCH_URI });
    const elasticClient = new Client({
        cloud: {
          id: process.env.ELASTICSEARCH_ID ? process.env.ELASTICSEARCH_ID:'0'
        },
        auth: {
          username: process.env.ELASTICSEARCH_USER ? process.env.ELASTICSEARCH_USER:'0',
          password: process.env.ELASTICSEARCH_PASS ? process.env.ELASTICSEARCH_PASS:'0'
        }
      });

    return elasticClient;
}

export default elasticConnection;