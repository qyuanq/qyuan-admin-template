// Just a mock data
const constantRoutes = [
  // {
  //   path: '/login',
  //   component: 'views/login/index',
  //   hidden: true
  // },

  // {
  //   path: '/404',
  //   component: 'views/404',
  //   hidden: true
  // },

  // {
  //   path: '/',
  //   component: 'layout',
  //   redirect: '/home',
  //   children: [{
  //     path: 'home',
  //     name: 'Home',
  //     component: 'views/home/index',
  //     meta: { title: '首页', icon: 'dashboard' }
  //   }]
  // },

  {
    path: '/school',
    component: 'layout',
    redirect: '/school/students',
    name: 'Example',
    meta: { title: '网校管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'students',
        name: 'Students',
        component: 'views/school/student',
        meta: { title: 'tabs', icon: 'table' }
      },
      {
        path: 'learning',
        name: 'Learning',
        component: 'views/school/learning',
        meta: { title: 'echarts图表', icon: 'tree' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: 'views/school/setting',
        meta: { title: '网校设置', icon: 'tree' }
      }
    ]
  },

  {
    path: '/shop-center',
    component: 'layout',
    meta: { title: '商城中心', icon: 'form' },
    children: [
      {
        path: 'goods-manage',
        name: 'GoodsManage',
        component: 'views/shop/goods-manage',
        meta: { title: '商品管理', icon: 'form' }
      },
      {
        path: 'virt-list',
        name: 'VirtList',
        component: 'views/shop/virt-list',
        meta: { title: '虚拟列表', icon: 'form' }
      },
      {
        path: 'trade-stat',
        name: 'TradeStat',
        component: 'views/shop/trade-stat',
        meta: { title: '交易统计', icon: 'form' }
      },
      {
        path: 'upload-big',
        name: 'UploadBigFile',
        component: 'views/shop/upload-big-file',
        meta: { title: '上传大文件', icon: 'form' }
      },
      {
        path: 'upload-qiniu',
        name: 'UploadQiniu',
        component: '/views/shop/upload-qiniu',
        meta: { title: '上传七牛云', icon: 'form' }
      },
      {
        path: 'download',
        name: 'Dowload',
        component: '/views/shop/download',
        meta: { title: '下载', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: 'layout',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '招生中心',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: 'views/nested/menu1/index', // Parent router-view
        name: 'Menu1',
        meta: { title: '营销管理' },
        children: [
          {
            path: 'menu1-1',
            component: 'views/nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: '招生设置' }
          },
          {
            path: 'menu1-2',
            component: 'views/nested/menu1/menu1-2',
            name: 'Menu1-2',
            meta: { title: '积分管理' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: 'views/nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: '直播推广' }
          },
          {
            path: 'menu1-4',
            component: 'views/nested/menu1/menu1-3',
            name: 'Menu1-4',
            meta: { title: '课程推广' }
          },
          {
            path: 'menu1-5',
            component: 'views/nested/menu1/menu1-3',
            name: 'Menu1-5',
            meta: { title: '资料下载' }
          }
        ]
      },
      {
        path: 'menu2',
        component: 'views/nested/menu2/index',
        name: 'Menu2',
        meta: { title: '招生CRM' },
        children: [
          {
            path: 'menu2-1',
            component: 'views/nested/menu2/index',
            name: 'menu2-1',
            meta: { title: '数据展示' }
          },
          {
            path: 'menu2-2',
            component: 'views/nested/menu2/index',
            name: 'menu2-2',
            meta: { title: '意向学员管理' }
          },
          {
            path: 'menu2-3',
            component: 'views/nested/menu2/index',
            name: 'menu2-3',
            meta: { title: '企业管理' }
          },
          {
            path: 'menu2-4',
            component: 'views/nested/menu2/index',
            name: 'menu2-4',
            meta: { title: '跟进记录' }
          },
          {
            path: 'menu2-5',
            component: 'views/nested/menu2/index',
            name: 'menu2-5',
            meta: { title: '访客计划' }
          },
          {
            path: 'menu2-6',
            component: 'views/nested/menu2/menu2-6/highSeas',
            name: 'menu2-6',
            meta: { title: '意向学员公海池' }
          },
          {
            path: 'menu2-7',
            component: 'views/nested/menu2/index',
            name: 'menu2-7',
            meta: { title: '企业公海池' }
          }
        ]
      },
      {
        path: 'menu3',
        component: 'views/nested/menu3/index',
        name: 'Menu3',
        meta: { title: '信息采集' }
      }
    ]
  },

  {
    path: '/educational-center',
    component: 'layout',
    meta: { title: '教务中心', icon: 'link' },
    children: [
      {
        path: 'student-status-manage',
        name: 'StudentStatus',
        component: 'views/educational/student-status',
        meta: { title: '学籍管理', icon: 'link' }
      },
      {
        path: 'teaching-manage',
        name: 'Teaching',
        component: 'views/educational/teaching',
        meta: { title: '教学管理', icon: 'link' }
      },
      {
        path: 'examination-manage',
        name: 'Examination',
        component: 'views/educational/examination',
        meta: { title: '考务管理', icon: 'link' }
      }
    ]
  },

  {
    path: '/financial-center',
    name: 'Financial',
    component: 'layout',
    meta: { title: '财务中心', icon: 'link' },
    children: [
      {
        path: 'paycost-manage',
        name: 'Paycost',
        component: 'views/financial/paycost',
        meta: { title: '缴费管理', icon: 'link' }
      },
      {
        path: 'lackof-manage',
        name: 'Lackof',
        component: 'views/financial/lackof',
        meta: { title: '欠费管理', icon: 'link' }
      },
      {
        path: 'they-deal',
        name: 'TheyDeal',
        component: 'views/financial/they-deal',
        meta: { title: '网校交易', icon: 'link' }
      }
    ]
  },

  {
    path: 'external-link',
    component: 'layout',
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

const asyncRoutes = [
  {
    path: '/permission',
    component: 'layout',
    redirect: '/permission/role',
    name: 'permission',
    meta: { title: '权限控制', icon: 'el-icon-s-help', roles: ['admin'] },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: 'views/permission/role',
        meta: { title: '角色管理', icon: 'table', roles: ['admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// Just a mock data

// const constantRoutes = [
//   {
//     path: '/redirect',
//     component: 'layout/layout',
//     hidden: true,
//     children: [
//       {
//         path: '/redirect/:path*',
//         component: 'views/redirect/index'
//       }
//     ]
//   },
//   {
//     path: '/login',
//     component: 'views/login/index',
//     hidden: true
//   },
//   {
//     path: '/auth-redirect',
//     component: 'views/login/auth-redirect',
//     hidden: true
//   },
//   {
//     path: '/404',
//     component: 'views/error-page/404',
//     hidden: true
//   },
//   {
//     path: '/401',
//     component: 'views/error-page/401',
//     hidden: true
//   },
//   {
//     path: '',
//     component: 'layout/layout',
//     redirect: 'dashboard',
//     children: [
//       {
//         path: 'dashboard',
//         component: 'views/dashboard/index',
//         name: 'Dashboard',
//         meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
//       }
//     ]
//   },
//   {
//     path: '/documentation',
//     component: 'layout/layout',
//     children: [
//       {
//         path: 'index',
//         component: 'views/documentation/index',
//         name: 'Documentation',
//         meta: { title: 'Documentation', icon: 'documentation', affix: true }
//       }
//     ]
//   },
//   {
//     path: '/guide',
//     component: 'layout/layout',
//     redirect: '/guide/index',
//     children: [
//       {
//         path: 'index',
//         component: 'views/guide/index',
//         name: 'Guide',
//         meta: { title: 'Guide', icon: 'guide', noCache: true }
//       }
//     ]
//   }
// ]

// const asyncRoutes = [
//   {
//     path: '/permission',
//     component: 'layout/layout',
//     redirect: '/permission/index',
//     alwaysShow: true,
//     meta: {
//       title: 'Permission',
//       icon: 'lock',
//       roles: ['admin', 'editor']
//     },
//     children: [
//       {
//         path: 'page',
//         component: 'views/permission/page',
//         name: 'PagePermission',
//         meta: {
//           title: 'Page Permission',
//           roles: ['admin']
//         }
//       },
//       {
//         path: 'directive',
//         component: 'views/permission/directive',
//         name: 'DirectivePermission',
//         meta: {
//           title: 'Directive Permission'
//         }
//       },
//       {
//         path: 'role',
//         component: 'views/permission/role',
//         name: 'RolePermission',
//         meta: {
//           title: 'Role Permission',
//           roles: ['admin']
//         }
//       }
//     ]
//   },

//   {
//     path: '/icon',
//     component: 'layout/layout',
//     children: [
//       {
//         path: 'index',
//         component: 'views/icons/index',
//         name: 'Icons',
//         meta: { title: 'Icons', icon: 'icon', noCache: true }
//       }
//     ]
//   },

//   {
//     path: '/components',
//     component: 'layout/layout',
//     redirect: 'noRedirect',
//     name: 'ComponentDemo',
//     meta: {
//       title: 'Components',
//       icon: 'component'
//     },
//     children: [
//       {
//         path: 'tinymce',
//         component: 'views/components-demo/tinymce',
//         name: 'TinymceDemo',
//         meta: { title: 'Tinymce' }
//       },
//       {
//         path: 'markdown',
//         component: 'views/components-demo/markdown',
//         name: 'MarkdownDemo',
//         meta: { title: 'Markdown' }
//       },
//       {
//         path: 'json-editor',
//         component: 'views/components-demo/json-editor',
//         name: 'JsonEditorDemo',
//         meta: { title: 'Json Editor' }
//       },
//       {
//         path: 'split-pane',
//         component: 'views/components-demo/split-pane',
//         name: 'SplitpaneDemo',
//         meta: { title: 'SplitPane' }
//       },
//       {
//         path: 'avatar-upload',
//         component: 'views/components-demo/avatar-upload',
//         name: 'AvatarUploadDemo',
//         meta: { title: 'Avatar Upload' }
//       },
//       {
//         path: 'dropzone',
//         component: 'views/components-demo/dropzone',
//         name: 'DropzoneDemo',
//         meta: { title: 'Dropzone' }
//       },
//       {
//         path: 'sticky',
//         component: 'views/components-demo/sticky',
//         name: 'StickyDemo',
//         meta: { title: 'Sticky' }
//       },
//       {
//         path: 'count-to',
//         component: 'views/components-demo/count-to',
//         name: 'CountToDemo',
//         meta: { title: 'Count To' }
//       },
//       {
//         path: 'mixin',
//         component: 'views/components-demo/mixin',
//         name: 'ComponentMixinDemo',
//         meta: { title: 'componentMixin' }
//       },
//       {
//         path: 'back-to-top',
//         component: 'views/components-demo/back-to-top',
//         name: 'BackToTopDemo',
//         meta: { title: 'Back To Top' }
//       },
//       {
//         path: 'drag-dialog',
//         component: 'views/components-demo/drag-dialog',
//         name: 'DragDialogDemo',
//         meta: { title: 'Drag Dialog' }
//       },
//       {
//         path: 'drag-select',
//         component: 'views/components-demo/drag-select',
//         name: 'DragSelectDemo',
//         meta: { title: 'Drag Select' }
//       },
//       {
//         path: 'dnd-list',
//         component: 'views/components-demo/dnd-list',
//         name: 'DndListDemo',
//         meta: { title: 'Dnd List' }
//       },
//       {
//         path: 'drag-kanban',
//         component: 'views/components-demo/drag-kanban',
//         name: 'DragKanbanDemo',
//         meta: { title: 'Drag Kanban' }
//       }
//     ]
//   },
//   {
//     path: '/charts',
//     component: 'layout/layout',
//     redirect: 'noRedirect',
//     name: 'Charts',
//     meta: {
//       title: 'Charts',
//       icon: 'chart'
//     },
//     children: [
//       {
//         path: 'keyboard',
//         component: 'views/charts/keyboard',
//         name: 'KeyboardChart',
//         meta: { title: 'Keyboard Chart', noCache: true }
//       },
//       {
//         path: 'line',
//         component: 'views/charts/line',
//         name: 'LineChart',
//         meta: { title: 'Line Chart', noCache: true }
//       },
//       {
//         path: 'mixchart',
//         component: 'views/charts/mixChart',
//         name: 'MixChart',
//         meta: { title: 'Mix Chart', noCache: true }
//       }
//     ]
//   },
//   {
//     path: '/nested',
//     component: 'layout/layout',
//     redirect: '/nested/menu1/menu1-1',
//     name: 'Nested',
//     meta: {
//       title: 'Nested',
//       icon: 'nested'
//     },
//     children: [
//       {
//         path: 'menu1',
//         component: 'views/nested/menu1/index',
//         name: 'Menu1',
//         meta: { title: 'Menu1' },
//         redirect: '/nested/menu1/menu1-1',
//         children: [
//           {
//             path: 'menu1-1',
//             component: 'views/nested/menu1/menu1-1',
//             name: 'Menu1-1',
//             meta: { title: 'Menu1-1' }
//           },
//           {
//             path: 'menu1-2',
//             component: 'views/nested/menu1/menu1-2',
//             name: 'Menu1-2',
//             redirect: '/nested/menu1/menu1-2/menu1-2-1',
//             meta: { title: 'Menu1-2' },
//             children: [
//               {
//                 path: 'menu1-2-1',
//                 component: 'views/nested/menu1/menu1-2/menu1-2-1',
//                 name: 'Menu1-2-1',
//                 meta: { title: 'Menu1-2-1' }
//               },
//               {
//                 path: 'menu1-2-2',
//                 component: 'views/nested/menu1/menu1-2/menu1-2-2',
//                 name: 'Menu1-2-2',
//                 meta: { title: 'Menu1-2-2' }
//               }
//             ]
//           },
//           {
//             path: 'menu1-3',
//             component: 'views/nested/menu1/menu1-3',
//             name: 'Menu1-3',
//             meta: { title: 'Menu1-3' }
//           }
//         ]
//       },
//       {
//         path: 'menu2',
//         name: 'Menu2',
//         component: 'views/nested/menu2/index',
//         meta: { title: 'Menu2' }
//       }
//     ]
//   },

//   {
//     path: '/example',
//     component: 'layout/layout',
//     redirect: '/example/list',
//     name: 'Example',
//     meta: {
//       title: 'Example',
//       icon: 'example'
//     },
//     children: [
//       {
//         path: 'create',
//         component: 'views/example/create',
//         name: 'CreateArticle',
//         meta: { title: 'Create Article', icon: 'edit' }
//       },
//       {
//         path: 'edit/:id(\\d+)',
//         component: 'views/example/edit',
//         name: 'EditArticle',
//         meta: { title: 'Edit Article', noCache: true },
//         hidden: true
//       },
//       {
//         path: 'list',
//         component: 'views/example/list',
//         name: 'ArticleList',
//         meta: { title: 'Article List', icon: 'list' }
//       }
//     ]
//   },

//   {
//     path: '/tab',
//     component: 'layout/layout',
//     children: [
//       {
//         path: 'index',
//         component: 'views/tab/index',
//         name: 'Tab',
//         meta: { title: 'Tab', icon: 'tab' }
//       }
//     ]
//   },

//   {
//     path: '/error',
//     component: 'layout/layout',
//     redirect: 'noRedirect',
//     name: 'ErrorPages',
//     meta: {
//       title: 'Error Pages',
//       icon: '404'
//     },
//     children: [
//       {
//         path: '401',
//         component: 'views/error-page/401',
//         name: 'Page401',
//         meta: { title: 'Page 401', noCache: true }
//       },
//       {
//         path: '404',
//         component: 'views/error-page/404',
//         name: 'Page404',
//         meta: { title: 'Page 404', noCache: true }
//       }
//     ]
//   },

//   {
//     path: '/error-log',
//     component: 'layout/layout',
//     redirect: 'noRedirect',
//     children: [
//       {
//         path: 'log',
//         component: 'views/error-log/index',
//         name: 'ErrorLog',
//         meta: { title: 'Error Log', icon: 'bug' }
//       }
//     ]
//   },

//   {
//     path: '/excel',
//     component: 'layout/layout',
//     redirect: '/excel/export-excel',
//     name: 'Excel',
//     meta: {
//       title: 'Excel',
//       icon: 'excel'
//     },
//     children: [
//       {
//         path: 'export-excel',
//         component: 'views/excel/export-excel',
//         name: 'ExportExcel',
//         meta: { title: 'Export Excel' }
//       },
//       {
//         path: 'export-selected-excel',
//         component: 'views/excel/select-excel',
//         name: 'SelectExcel',
//         meta: { title: 'Select Excel' }
//       },
//       {
//         path: 'export-merge-header',
//         component: 'views/excel/merge-header',
//         name: 'MergeHeader',
//         meta: { title: 'Merge Header' }
//       },
//       {
//         path: 'upload-excel',
//         component: 'views/excel/upload-excel',
//         name: 'UploadExcel',
//         meta: { title: 'Upload Excel' }
//       }
//     ]
//   },

//   {
//     path: '/zip',
//     component: 'layout/layout',
//     redirect: '/zip/download',
//     alwaysShow: true,
//     meta: { title: 'Zip', icon: 'zip' },
//     children: [
//       {
//         path: 'download',
//         component: 'views/zip/index',
//         name: 'ExportZip',
//         meta: { title: 'Export Zip' }
//       }
//     ]
//   },

//   {
//     path: '/pdf',
//     component: 'layout/layout',
//     redirect: '/pdf/index',
//     children: [
//       {
//         path: 'index',
//         component: 'views/pdf/index',
//         name: 'PDF',
//         meta: { title: 'PDF', icon: 'pdf' }
//       }
//     ]
//   },
//   {
//     path: '/pdf/download',
//     component: 'views/pdf/download',
//     hidden: true
//   },

//   {
//     path: '/theme',
//     component: 'layout/layout',
//     redirect: 'noRedirect',
//     children: [
//       {
//         path: 'index',
//         component: 'views/theme/index',
//         name: 'Theme',
//         meta: { title: 'Theme', icon: 'theme' }
//       }
//     ]
//   },

//   {
//     path: '/clipboard',
//     component: 'layout/layout',
//     redirect: 'noRedirect',
//     children: [
//       {
//         path: 'index',
//         component: 'views/clipboard/index',
//         name: 'ClipboardDemo',
//         meta: { title: 'Clipboard Demo', icon: 'clipboard' }
//       }
//     ]
//   },

//   {
//     path: '/i18n',
//     component: 'layout/layout',
//     children: [
//       {
//         path: 'index',
//         component: 'views/i18n-demo/index',
//         name: 'I18n',
//         meta: { title: 'I18n', icon: 'international' }
//       }
//     ]
//   },

//   {
//     path: 'external-link',
//     component: 'layout/layout',
//     children: [
//       {
//         path: 'https://github.com/PanJiaChen/vue-element-admin',
//         meta: { title: 'External Link', icon: 'link' }
//       }
//     ]
//   },

//   { path: '*', redirect: '/404', hidden: true }
// ]

module.exports = {
  constantRoutes,
  asyncRoutes
}

module.exports = {
  constantRoutes,
  asyncRoutes
}
