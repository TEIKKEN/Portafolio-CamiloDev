import ajtrucksImg from '@/assets/images/AJTRUCKS.png';
import brutalcalcImg from '@/assets/images/BrutalCalc.png';
import fallosistemaImg from '@/assets/images/Fallodelsistema.png';
import inclusiaImg from '@/assets/images/Inclusiaweb.png';

export const PROJECTS = [
  {
    id: 'inclusia',
    title: 'Inclusia',
    image: inclusiaImg,
    demoUrl: 'https://teikken.github.io/Inclusia/index.html',
    githubUrl: 'https://github.com/TEIKKEN/Inclusia',
    status: 'live',
    accent: 'mint',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'brutalcalc',
    title: 'BrutalCalc',
    image: brutalcalcImg,
    demoUrl: 'https://brutal-calc-edmm.vercel.app/',
    githubUrl: 'https://github.com/TEIKKEN/BrutalCalc',
    status: 'live',
    accent: 'cyan',
    tech: ['React', 'Vite', 'CSS', 'React Context API'],
  },
  {
    id: 'fallo-del-sistema',
    title: 'Fallo del Sistema',
    image: fallosistemaImg,
    demoUrl: 'https://fallo-del-sistema.vercel.app/',
    githubUrl: 'https://github.com/TEIKKEN/Fallo-del-sistema',
    status: 'live',
    accent: 'coral',
    tech: ['React', 'Vite', 'CSS', 'Framer Motion'],
  },
  {
    id: 'ajtrucks',
    title: 'AJ Trucks',
    image: ajtrucksImg,
    demoUrl: 'https://gestion-de-flota-de-camiones.vercel.app/',
    githubUrl: 'https://github.com/TEIKKEN/Gestion-de-flota-de-camiones',
    status: 'live',
    accent: 'amber',
    tech: ['React', 'Vite', 'CSS', 'JavaScript'],
  },
];