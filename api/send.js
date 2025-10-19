export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: 'userId and message are required' });
    }

    const webhookUrl = 'https://discord.com/api/webhooks/xxxxxxxxxxxx/yyyyyyyyyyyyyyyyyy'; // ← あなたのURL

    const payload = {
      content: `<@${userId}> ${message}`,
      allowed_mentions: {
        users: [userId]
      }
    };

    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!discordRes.ok) {
      const errorText = await discordRes.text(); // Discordからのレスポンス内容
      return res.status(500).json({ error: 'Discord Error', details: errorText });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
