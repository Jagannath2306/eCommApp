
module.exports = {
    components: {
        schemas: {
            CustomerRegister: {
                type: "object",
                required: ["firstName", "lastName", "email", "phone", "password", "userTypeId"],
                properties: {
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                    userTypeId: { type: "string" },
                    password: { type: "string" },
                    confirmPassword: { type: "string" }
                },
            },

            CustomerLogin: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string" },
                    password: { type: "string" }
                },
            },

            UpdateCustomerProfile: {
                type: "object",
                required: ["firstName", "lastName", "phone", "profilePicture"],
                properties: {
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    phone: { type: "string" },
                    profilePicture: { type: "string" }
                },
            },
            GetAllCustomers: {
                type: "object",
                required: ['pageSize', 'page', "sortCol", "sort"],
                properties: {
                    pageSize: { type: "string" },
                    page: { type: "string" },
                    sortCol: { type: "string" },
                    sort: { type: "string" }
                }
            },
            EmailValidation: {
                type: "object",
                required: ['email'],
                properties: {
                    email: { type: "string" }
                }
            },
            ResetPassword: {
                type: "object",
                required: ['email', 'newPassword', 'oldPassword'],
                properties: {
                    email: { type: "string" },
                    newPassword: { type: "string" },
                    oldPassword: { type: "string" }
                }
            },
        },
    },
};
