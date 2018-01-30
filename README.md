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

MIT License

Copyright (c) 2018 Rizki Romadhoni

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.