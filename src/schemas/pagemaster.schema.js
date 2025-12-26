module.exports = {
    components: {
        schemas: {
             InsertPageMaster: {
                type: "object",
                required: ['moduleId', 'subModuleId', 'name', 'icon', 'url', 'defaultActive', 'menuRank'],
                properties: {
                    moduleId: { type: "string" },
                    subModuleId: { type: "string" },
                    name: { type: "string" },
                    icon: { type: "string" },
                    url: { type: "string" },
                    defaultActive: { type: "boolean" },
                    menuRank: { type: "number" }
                }
            },
            UpdatePageMaster: {
                type: "object",
                required: ['id', 'moduleId', 'subModuleId', 'name', 'icon', 'url', 'defaultActive', 'menuRank'],
                properties: {
                    id: { type: "string" },
                    moduleId: { type: "string" },
                    subModuleId: { type: "string" },
                    name: { type: "string" },
                    icon: { type: "string" },
                    url: { type: "string" },
                    defaultActive: { type: "boolean" },
                    menuRank: { type: "number" }
                }
            },
            GetAllPageMasters: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                    pageSize: { type: "number" },
                    page: { type: "number" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            GetPageMasterById: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            },
            DeletePageMaster: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }
}
