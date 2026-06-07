export default async function handler(req: any, res: any) {
  return res.status(200).json({
    status: 'ok',
    api_key_configured: !!process.env.GEMINI_API_KEY
  });
}
