## GraphQL Timeout Middleware

A GraphQL Middleware that prevents slow resolvers from damaging the response speed of your GraphQL Server

### Usage

Please look at `example/schema.js` to find the usage.
Example output would look like as follows:

```json
{
  "data": {
    "getPosts": [
      {
        "id": "d33c87a4-fa23-4cde-8840-1f70700eda60",
        "text": "Enim voluptatem sed et harum velit.",
        "comments": [
          {
            "id": "bf4c4ea6-d555-45c6-8db8-405c31bf57bc",
            "text": "Sed id sit aliquam repellat quia impedit ex placeat omnis.",
            "replies": null
          },
          {
            "id": "c7cdc1f5-8727-45c6-bec8-37f4de497a41",
            "text": "Repellendus quidem porro in labore facere ut voluptas labore.",
            "replies": null
          }
        ]
      }
    ]
  },
  "errors": [
    {
      "message": "GraphQL Timeout Error: Comment.replies has timed out after waiting for 14888ms",
      "locations": [
        {
          "line": 9,
          "column": 11
        }
      ],
      "path": [
        "getPosts",
        0,
        "comments",
        0,
        "replies"
      ]
    },
    {
      "message": "GraphQL Timeout Error: Comment.replies has timed out after waiting for 14888ms",
      "locations": [
        {
          "line": 9,
          "column": 11
        }
      ],
      "path": [
        "getPosts",
        0,
        "comments",
        1,
        "replies"
      ]
    }
  ]
}
```

### License

MIT