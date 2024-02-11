import { Link } from 'react-router-dom'

// Icons 
import logo from '../assets/images/icons/logo.png'
import login from '../assets/images/icons/login.png'
import messageIcon from '../assets/images/icons/messageIcon.png'
import planIcon from '../assets/images/icons/planIcon.png'
import targetIcon from '../assets/images/icons/targetIcon.png'

// photo
import rightPhoto from '../assets/images/home/men.png'




const Homepage = () => {
  return (
    <div className=' bg-[#20374b] min-h-screen px-20 py-6'>
        <nav className='flex items-center justify-between'>
            <div className='flex items-center'>
                <img src={logo} alt="Logo MPI Todolist" className='w-10 h-10 cursor-pointer mr-1'  />
                <h1 className=' text-[#ffffff] font-bold text-4xl mt-1'>LISTES</h1>
            </div>
            <ul className='flex items-center list-none ml-[1300px]'>
                <li className='list-none inline-block'><Link to="/" className='no-underline text-white px-3 hover:text-[#fdc127] hover:font-bold'>Home</Link></li>
                <li className='list-none inline-block'><Link to="/dashboard" className='no-underline text-white px-3 hover:text-[#fdc127] hover:font-bold'>dashboard</Link></li>
                <li className='list-none inline-block'><Link to="/auth/login" className='no-underline text-white px-3 hover:text-[#fdc127] hover:font-bold'>Login</Link></li>
            </ul>
            <div className=""> {/* Utilisez ml-auto pour aligner les éléments à droite */}
                <Link to="/auth/login">
                    <img src={login} alt="login" className='w-10 h-10 cursor-pointer '  />
                </Link>
            </div>
        </nav>

        <div className='flex flex-wrap items-center justify-center'> 
        <div className='w-full md:w-1/2 text-white mt-25 text-left md:text-center'> 
            <h1 className='text-6xl font-semibold leading-normal mb-10 text-left'><span className='text-[#fdc127] font-bold'>MPI Todolist</span> <br /><span className='font-thin'> Organize your <br />tasks efficiently</span></h1>
            <p className='max-w-lg text-left'>Welcome to <span className='text-[#fdc127] font-bold'>MPI Todolist</span>, your ultimate tool to manage your daily tasks efficiently and organized. With <span className='text-[#fdc127] font-bold'>MPI Todolist</span>, you can create, edit, and track your tasks in real-time, whether individually or as a team. Never miss a deadline again and always stay productive with our intuitive and flexible application. Start simplifying your life and accomplishing more in less time with <span className='text-[#fdc127] font-bold'>MPI Todolist</span>!</p>
            <div className='text-left mt-8'>
                <button className='bg-[#fdc127] px-14 py-4 rounded-xl'>
                    <Link to="/auth/register" className='text-[#20374B] font-medium text-xl hover:text-[#20374b] hover:font-bold'>Register</Link>
                </button>
            </div>
        </div>


            <div className='w-full md:w-1/2 relative'>
                <img src={rightPhoto} alt="login" className='w-full md:w-auto mx-auto'/> 

                {/* Icone 1 */}
                <div className="absolute bottom-0 left-0 ml-4 mt-4"> 
                    <img src={planIcon} alt="icone1" className="w-[150px] h-auto" />
                </div>

                {/* Icone 2 */}
                <div className="absolute bottom-0 right-0 mr-1 mb-1"> 
                    <img src={targetIcon} alt="icone2" className="w-[130px] h-auto" />
                </div>

                {/* Icone 3 */}
                <div className="absolute top-0 left-0 ml-4 mt-4"> 
                    <img src={messageIcon} alt="icone3" className="w-[130px] h-auto" />
                </div>
            </div>


        </div>
    </div>

  )
}

export default Homepage