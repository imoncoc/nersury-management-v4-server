# batch-3-assignment-2

- **Objective**: Develop a Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for effective data management. Ensure data integrity through validation with Zod.

### Set up VERCEL live link

- **Endpoint**: **`https://mongoose-assignment-2-five.vercel.app/`**

## **Products API**

- **Sample Request Body**:

```json
{
  "product": {
    "name": "Redme note 13 pro",
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
    "name": "Redme note 13 pro",
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
