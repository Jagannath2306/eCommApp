module.exports = {
    components: {
        schemas: {
             InsertUserPageRights: {
                type: "object",
                required: ['userId', 'moduleId', 'subModuleId', 'pageIds'],
                properties: {
                    userId: { type: "string" },
                    moduleId: { type: "string" },
                    subModuleId: { type: "string" },
                    pageIds: { type: "string" },
                }
            },
            UpdateUserPageRights: {
                type: "object",
                required: ['userId', 'moduleId', 'subModuleId', 'pageIds'],
                properties: {
                    userId: { type: "string" },
                    moduleId: { type: "string" },
                    subModuleId: { type: "string" },
                    pageIds: { type: "string" },
                }
            },
            GetAllUserPageRights: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                    pageSize: { type: "number" },
                    page: { type: "number" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            GetUserPageRightsById: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            },
            GetPageRightsByUserAndModule: {
                type: "object",
                required: ['userId', 'moduleId'],
                properties: {
                    userId: { type: "string" },
                    moduleId: { type: "string" }
                }
            },
            GetPageRightsByUser: {
                type: "object",
                required: ['userId'],
                properties: {
                    userId: { type: "string" }
                }
            },
            UpdateMenuConfig: {
                type: "object",
                required: ['moduleIds' , 'subModuleIds' , 'pageIds'],
                properties: {
                    moduleIds: { type: "string" },
                    subModuleIds: { type: "string" },
                    pageIds: { type: "string" }
                }
            }
        }
    }
}
