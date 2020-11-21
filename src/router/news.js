import Admin from '@/views/back_office/index.vue'
import AdminNews from '@/views/back_office/News/AdminNewsList.vue'
import AdminNewsEdit from '@/views/back_office/News/AdminNewsEdit.vue'
import AdminNewsCreate from '@/views/back_office/News/AdminNewsCreate.vue'
import News from '@/views/front_office/News/News'
import ShowNews from '@/views/front_office/News/ShowNews'

const routes = [
    {
        path: '/admin/news',
        name: 'Admin.news',
        component: AdminNews,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/news/create',
        name: 'Admin.news.create',
        component: AdminNewsCreate,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/news/edit/:id',
        name: 'Admin.news.edit',
        component: AdminNewsEdit,
        meta: { requiresAuth: true }
    },
    {
        path: '/news',
        name: 'News',
        component: News
    },
    {
        path: '/news/:id',
        name: 'News.show',
        component: ShowNews
    }
]

export default routes
