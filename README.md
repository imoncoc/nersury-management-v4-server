# batch-3-assignment-2

# Assignment 2

An Express.js project using MongoDB and TypeScript with Zod validation.

## Prerequisites

- Node.js v14.x or later
- npm v6.x or later / yarn v1.x or later
- MongoDB

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/imoncoc/assignment-2.git
   cd assignment-2
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory:

4. **Compile TypeScript**

   ```bash
   npm run build
   ```

5. **Run the Project**
   ```bash
   npm run start:dev
   ```

The application will run on `http://localhost:5000`.

- **Objective**: Develop a Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for effective data management. Ensure data integrity through validation with Zod.

### Set up VERCEL live link

- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/`**

## **Products API**

### **1. Create a New Product**

- **Sample Request Body**:
- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/api/products`**
- **Method: `POST`**

```json
{
  "product": {
    "name": "iPhone 14",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
      {
        "type": "Color",
        "value": "Midnight Blue"
      },
      {
        "type": "Storage Capacity",
        "value": "256GB"
      }
    ],
    "inventory": {
      "quantity": 50,
      "inStock": true
    }
  }
}
```

- **Sample Response**:

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "name": "iPhone",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
      {
        "type": "Color",
        "value": "Midnight Blue"
      },
      {
        "type": "Storage Capacity",
        "value": "256GB"
      }
    ],
    "inventory": {
      "quantity": 50,
      "inStock": true
    },
    "_id": "664da14674e3efc92b1fc36a"
  }
}
```

### **2. Retrieve a List of All Products**

- **Sample Request Body**:
- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/api/products`**
- **Method: `GET`**

- **Sample Response**:

```json
{
    "success": true,
    "message": "Products fetched successfully!",
    "data": [
        {
            "_id": "664cb6b893e34ad4917ebbab",
            "name": "iPhone 15",
            "description": "A sleek and powerful smartphone with cutting-edge features.",
            "price": 1199,
            "category": "Electronics",
            "tags": [
                "smartphone",
                "Apple",
                "iOS"
            ],
            "variants": [
                {
                    "type": "Color",
                    "value": "Midnight Blue"
                },
                {
                    "type": "Storage Capacity",
                    "value": "256GB"
                }
            ],
            "inventory": {
                "quantity": 50,
                "inStock": true
            }
        },
       ....more
    ]
}
```

### **3. Retrieve a Specific Product by ID**

- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/api/products/664cb6de93e34ad4917ebbaf`**
- **Method: `GET`**
- **Sample Response**:

```json
{
  "success": true,
  "message": "Product fetched successfully!",
  "data": [
    {
      "_id": "664cb6de93e34ad4917ebbaf",
      "name": "Samsung Galaxy S21",
      "description": "High-performance Android smartphone with advanced camera capabilities.",
      "price": 799,
      "category": "Electronics",
      "tags": ["smartphone", "Samsung", "Android"],
      "variants": [
        {
          "type": "Color",
          "value": "Phantom Black"
        },
        {
          "type": "Storage Capacity",
          "value": "128GB"
        }
      ],
      "inventory": {
        "quantity": 30,
        "inStock": false
      }
    }
  ]
}
```

### **4. Update Product Information**

- **Sample Request Body**:
- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/api/products/:productId`**
- **Method: `PUT`**

```json
{
  "name": "iPhone 11",
  "price": 599,
  "description": "A sleek and powerful but older smartphone with cutting-edge features."
}
```

- **Sample Response**:

```json
{
  "success": true,
  "message": "Product updated successfully!",
  "data": {
    "_id": "664cb6b893e34ad4917ebbab",
    "name": "iPhone 11",
    "description": "A sleek and powerful but older smartphone with cutting-edge features.",
    "price": 599,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
      {
        "type": "Color",
        "value": "Midnight Blue"
      },
      {
        "type": "Storage Capacity",
        "value": "256GB"
      }
    ],
    "inventory": {
      "quantity": 50,
      "inStock": true
    }
  }
}
```

### **5. Update Delete a Product**

- **Sample Request Body**:
- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/api/products/:productId`**
- **Method: `DELETE`**

```json
{
  "success": true,
  "message": "Product deleted successfully!",
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```

### **6. Search a product**

- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/api/products/samsung`**
- **Method: `GET`**
- **Sample Response**:

```json
{
  "success": true,
  "message": "Products matching search term 'samsung' fetched successfully!",
  "data": [
    {
      "_id": "664cb6de93e34ad4917ebbaf",
      "name": "Samsung Galaxy S21",
      "description": "High-performance Android smartphone with advanced camera capabilities.",
      "price": 799,
      "category": "Electronics",
      "tags": ["smartphone", "Samsung", "Android"],
      "variants": [
        {
          "type": "Color",
          "value": "Phantom Black"
        },
        {
          "type": "Storage Capacity",
          "value": "128GB"
        }
      ],
      "inventory": {
        "quantity": 30,
        "inStock": false
      }
    }
  ]
}
```

## **Order API**

### **1. Create a New Order**

- **Sample Request Body**:
- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/api/orders`**
- **Method: `POST`**

```json
{
  "order": {
    "email": "john@gmail.com",
    "productId": "664cb6cd93e34ad4917ebbad",
    "price": 1130,
    "quantity": 1
  }
}
```

- **Sample Response**:

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "email": "john@gmail.com",
    "productId": "664cb6cd93e34ad4917ebbad",
    "price": 1130,
    "quantity": 1,
    "_id": "664dafd8d47e3bbb7982daeb"
  }
}
```

### **2. Retrieve a List of All Orders**

- **Sample Request Body**:
- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/api/orders`**
- **Method: `GET`**

- **Sample Response**:

```json
{
    "success": true,
    "message": "Orders fetched successfully!",
    "data": [
        {
            "_id": "664ce38ced807199724c289c",
            "email": "level2@programming-hero.com",
            "productId": "5fd67e890b60c903cd8544a3",
            "price": 999,
            "quantity": 1
        },
        ....more
    ]
}

```

### **3. Retrieve Orders by User Email**

- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/api/orders?email=level2@programming-hero.com`**
- **Method: `GET`**
- **Sample Response**:

```json
{
  "success": true,
  "message": "Orders fetched successfully for user email: level2@programming-hero.com !",
  "data": [
    {
      "_id": "664ce38ced807199724c289c",
      "email": "level2@programming-hero.com",
      "productId": "5fd67e890b60c903cd8544a3",
      "price": 999,
      "quantity": 1
    },
    {
      "_id": "664ce654203a02a223444b94",
      "email": "level2@programming-hero.com",
      "productId": "5fd67e890b60c903cd8544a3",
      "price": 1000,
      "quantity": 1
    }
  ]
}
```

## Validation and Error Handling

This project uses Zod for validation and provides clear error messages for invalid API requests and undefined routes.

### API Validation

All API endpoints validate the request data using Zod schemas. If the validation fails, the API will respond with a 400 status code and a detailed error message.

### No Route Found

If a request is made to an undefined route, the API responds with a 400 status code and the following JSON message:

```json
{
  "success": false,
  "message": "Route is not found!"
}
```
