import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Documentasi API POS Coffee Shop",
    description:
      "Applikasi untuk pembelian/pemesanan menu di Coffee Shop dengan menggunakan MERN Stack",
  },
  servers: [
    {
      url: "http://localhost:5001/api",
      description: "Development server",
    },
    {
      url: "https://kasyaproject-pos-coffeeshop-backend.vercel.app/api",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "admin123",
        password: "Admin123",
      },
      ActivationRequest: {
        code: "qwerty1234567890",
      },
      UserRequest: {
        fullname: "dika123123",
        username: "dika123123",
        email: "dika123123@gmail.com",
        password: "password123",
        confirmPassword: "password123",
        role: "admin // member",
        profilePicture: "fileUrl",
      },
      UpdateProfileRequest: {
        fullname: "dika123123",
        username: "dika123123",
        email: "dika123123@gmail.com",
        role: "admin // member",
        profilePicture: "fileUrl",
      },
      UpdatePasswordRequest: {
        oldPassword: "oldPassword123",
        password: "newPassword123",
        confirmPassword: "newPassword123",
      },
      CategoryRequest: {
        name: "category name",
        description: "category description",
        icon: "fileUrl",
      },
      RemoveMediaRequest: {
        fileUrl: "",
      },
      MenuRequest: {
        name: "Menu - name",
        description: "Menu - desc",
        pric: 0,
        size: "small // medium // large",
        image: "fileUrl",
        category: "categoryId",
        isActive: true,
      },
      OrderRequest: {
        cust: "nama customer",
        item: [
          {
            menu: "menuId",
            quantity: 1,
          },
        ],
        voucher: "kode voucher",
        note: "catatan untuk order",
      },
      ReviewRequest: {
        cust: "Name of customer",
        star: 5,
        comment: "Comment for review",
        menu: "menuId",
      },
      VoucherRequest: {
        name: "name of voucher",
        kode: "kode of voucher",
        description: "desc of voucher",
        diskon: 0,
        startDate: "2025-07-02",
        endDate: "2025-07-02",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointFiles = [
  "../routes/auth.routes.ts",
  "../routes/user.routes.ts",
  "../routes/category.routes.ts",
  "../routes/media.routes.ts",
  "../routes/menu.routes.ts",
  "../routes/order.routes.ts",
  "../routes/review.routes.ts",
  "../routes/voucher.routes.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointFiles, doc);
