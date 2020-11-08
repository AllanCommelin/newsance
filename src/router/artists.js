import AdminArtists from '@/views/back_office/Artists/AdminArtistsList.vue'
import AdminArtistsCreate from '@/views/back_office/Artists/AdminArtistsCreate.vue'
import AdminArtistsEdit from '@/views/back_office/Artists/AdminArtistsEdit.vue'

const routes = [
    {
        path: '/admin/artists',
        name: 'Admin.artists',
        component: AdminArtists,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/artists/create',
        name: 'Admin.artists.create',
        component: AdminArtistsCreate,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/artists/edit/:id',
        name: 'Admin.artists.edit',
        component: AdminArtistsEdit,
        meta: { requiresAuth: true }
    },
]

export default routes