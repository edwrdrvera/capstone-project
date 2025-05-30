import swaggerJsDoc from "swagger-jsdoc";

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const serverUrl: string =
	process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

// define swagger options
const swaggerOptions: swaggerJsDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Location, Pokemon, Sightings Management API Documentation",
			version: "1.0.0",
			description: "This is the API documentation for PokeLog.",
		},
		server: [
			{
				url: serverUrl,
				description:
					process.env.NODE_ENV === "production"
						? "Production Server"
						: "Local Server",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	// path to annotated files
	apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/models/*.ts"],
};

// Initialize Swagger JSDoc object
export const generateSwaggerDocs = (): object => {
	return swaggerJsDoc(swaggerOptions);
};
