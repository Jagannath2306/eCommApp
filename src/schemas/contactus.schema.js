
module.exports = {
    components: {
        schemas: {
            ContactUsRegister: {
                type: "object",
                required: ["firstName", "lastName", "email", "phone", "message"],
                properties: {
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                    message: { type: "string" }
                },
            },

            GetAllContactUs: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                    pageSize: { type: "string" },
                    page: { type: "string" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            DeleteContactUs: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            },
            GetContactUsById: {
                type: "object",
                required: ['id'],
                properties: {
                    id: { type: "string" }
                }
            }
        },
    },
};
