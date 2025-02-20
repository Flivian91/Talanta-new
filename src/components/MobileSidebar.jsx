function MobileSidebar({ onClose }) {
  const { isSignedIn, user } = useUser();
  const role = user?.publicMetadata?.role;

  return (
    <div className="fixed top-0 z-50 w-64 min-h-screen bg-primary md:hidden flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center shadow px-4 py-1">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-red-600 font-bold text-lg"
        >
          <Image
            src="/talanta.svg"
            alt="Talanta logo"
            className="md:-mt-2 -ml-4"
            width={100}
            height={50}
          />
        </Link>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-gray-700 hover:bg-gray-200 p-2 rounded md:hidden"
        >
          <AiOutlineClose size={22} />
        </button>
      </div>

      {/* Navigation - Use `flex-grow` to push buttons to bottom */}
      <nav className="px-4 py-2 flex-grow">
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Link>
            </li>
          ))}
          {isSignedIn && (
            <>
              {authnticatedLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>

      {/* Action Buttons - Use `mt-auto` to move to the bottom */}
      <div className="flex flex-col gap-2 px-4 py-2 mt-auto">
        {isSignedIn &&
          (role === "admin" ? (
            <DashboardButton link="admin" />
          ) : role === "sponser" ? (
            <DashboardButton link="sponser" />
          ) : (
            <UploadButton />
          ))}
        <AuthLogoutButton />
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center px-4 pb-4">
        <AuthButtons />
      </div>

      {/* Tooltip */}
      <Tooltip
        id="sidebar-tooltip"
        place="right"
        effect="solid"
        className="bg-gray-800 text-white px-2 py-1 rounded z-40"
      />
    </div>
  );
}
