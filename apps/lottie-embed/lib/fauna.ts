import faunadb from 'faunadb';
import { query as q } from 'faunadb';

export const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});

export default async (req, res) => {
  if (req.method === 'GET') {
    const query: any = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('shows'))),
        q.Lambda((show) => q.Get(show))
      )
    );

    res.status(200).json({ data: query.data });
  }
};
