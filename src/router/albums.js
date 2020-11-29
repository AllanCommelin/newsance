import AdminAlbums from '@/views/back_office/Albums/AdminAlbumsList.vue'
import AdminAlbumsCreate from '@/views/back_office/Albums/AdminAlbumsCreate.vue'
import AdminAlbumsEdit from '@/views/back_office/Albums/AdminAlbumsEdit.vue'
import FrontAlbum from '@/views/front_office/Album/Albums'

const routes = [
    {
        path: '/admin/albums',
        name: 'Admin.albums',
        component: AdminAlbums,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/albums/create',
        name: 'Admin.albums.create',
        component: AdminAlbumsCreate,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/albums/edit/:id',
        name: 'Admin.albums.edit',
        component: AdminAlbumsEdit,
        meta: { requiresAuth: true }
    },
    {
        path: '/albums',
        name: 'Albums',
        component: FrontAlbum
    }
]

export default routes
