export async function GET() {
  const messages = [
    "Today’s reason I love you: your laugh when you’re trying not to laugh.",
    "If you were a notification, you’d be the only one I never mute.",
    "Somehow you make even grocery runs feel like a date.",
    "You’re my favorite view, even on days with no sunsets.",
    "I still get a little excited when your name pops up on my phone.",
    "Even when nothing happens, the day still feels better because it had you."
  ];

  const random = messages[Math.floor(Math.random() * messages.length)];

  return Response.json({ message: random });
}
