import Link from "next/link";

export default function SecretPage() {
  return (
    <main className="secret-shell">
      <div className="secret-card">
        <div className="badge-soft">
          <span className="badge-dot" />
          For your ears only
        </div>

        <h1 className="love-title" style={{ fontSize: 28, marginTop: 16 }}>
          Okay… you actually clicked it. 😏
        </h1>

        <p className="love-subtitle" style={{ maxWidth: 520 }}>
          This is the little hidden room behind the web page. Whenever you land
          here, I want you to remember that there is at least one person on this
          planet who thinks of you, misses you, and made this just so they
          could talk to you in a slightly dramatic way.
        </p>

        <div className="secret-media-block">
          {/* AUDIO: drop your file as /public/secret-message.mp3 */}
          <audio
            className="secret-media"
            controls
            src="/secret-message.mp3"
          >
            Your browser does not support the audio element.
          </audio>

          <p className="secret-media-note">
            If this player is quiet, it just means I haven&apos;t uploaded the
            recording yet. But I promise it&apos;s coming. 💚
          </p>
        </div>

        <div className="secret-actions">
          <Link href="/" className="button-ghost nav-pill">
            ← Back to the little letter
          </Link>
        </div>
      </div>
    </main>
  );
}
