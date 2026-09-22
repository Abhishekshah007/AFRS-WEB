export default function AdminLogo() {
  return (
    <span className="afrs-admin-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/logo.png" alt="" width={40} height={40} />
      <span className="afrs-admin-logo__text">
        <strong>AFRS</strong>
        <span>Content Studio</span>
      </span>
    </span>
  )
}
