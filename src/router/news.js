import Admin from '@/views/back_office/index.vue'
import AdminNews from '@/views/back_office/News/AdminNewsList.vue'
import AdminNewsEdit from '@/views/back_office/News/AdminNewsEdit.vue'
import AdminNewsCreate from '@/views/back_office/News/AdminNewsCreate.vue'
import FrontNews from '@/views/front_office/News'

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
        component: FrontNews
    }
]

export default routes
