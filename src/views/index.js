import Dashboard from './pages/Dashboard';
import SponsorDashboard from './pages/sponsor/SponsorDashboard';
import GeneratedTests from './pages/sponsor/GeneratedTests';
import CreateSponsor from './pages/sponsor/CreateSponsor';
import ReportsPage from './pages/sponsor/Reports';
import SponsorProfile from './pages/sponsor/Profile';
import SubSponsor from './pages/sponsor/SubSponsor';
import Video from './pages/sponsor/Video';
import Learning from './pages/sponsor/Learning';
import UserDashboard from './pages/user/UserDashboard';
import TestResults from './pages/user/TestResults';
import UserProfile from './pages/user/Profile';
import Latest from './pages/user/Home';
import ManagementDashboard from './pages/sponsor/ManagementDashboard';

const pageList = {
  'user': [
    {
    name: 'Dashboard',
    path: '/user',
      exact: true,
    component: UserDashboard,
    },
    {
      name: 'Test Results',
      path: '/user/reports',
      exact: true,
      component: TestResults,
    },
    {
      name: 'Profile',
      path: '/user/profile',
      exact: true,
      component: UserProfile,
    },
  ], 'sponsor': [
    {
      name: 'Dashboard',
      path: '/sponsor',
      component: SponsorDashboard,
      exact: true,
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
    {
      name: 'Reports',
      path: '/sponsor/reports/',
      component: ReportsPage,
      exact: false,
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
    {
      name: 'GeneratedTests',
      path: '/sponsor/generated-tests',
      component: GeneratedTests,
      exact: true,
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
    {
      name: 'Profile',
      path: '/sponsor/profile',
      component: SponsorProfile,
      exact: true,
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
     {
      name: 'Video',
      path: '/sponsor/video-resources',
      component: Video,
      exact: true,
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
         {
      name: 'Learning',
      path: '/sponsor/elearning',
      component: Learning,
      exact: true,
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
             {
      name: 'Latest',
      path: '/sponsor/home',
      component: Latest,
      exact: true,
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE','NORMAL', 'DEMO']
    },
    {
      name: 'Create Sponsor',
      path: '/sponsor/create-sponsor',
      component: CreateSponsor,
      exact: true,
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE']
    },
    {
      name: 'Sponsor List',
      path: '/sponsor/subsponsor',
      component: SubSponsor,
      exact: true,
      allowed:['SYSTEM', 'MANAGEMENT', 'ADMINISTRATIVE']
    },
    {
      name: 'Management Dashboard',
      path: '/sponsor/management',
      component: ManagementDashboard,
      exact: true,
      allowed:['SYSTEM', 'MANAGEMENT']
    }
  ],
};

export default pageList;
