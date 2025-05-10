const TopMenu = () => {

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Resolve', path: '/resolve' },
        { name: 'Team', path: '/team' }
    ]
    return (
        <nav className='flex justify-around items-center p-4 bg- text-black'>
            <ul className="flex space-x-4">
                {links.map((link, index) => (
                    <li key={index} className="text-lg font-semibold hover:text-gray-300">
                        <a href={link.path}>{link.name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default TopMenu