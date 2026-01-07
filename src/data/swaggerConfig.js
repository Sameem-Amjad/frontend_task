export const swaggerYaml = `
openapi: 3.0.0
info:
  title: Bxtrack Interview
  version: 1.0.0
  description: ''
servers:
  - url: '{{base_url}}'

paths:
  /auth/register:
    post:
      summary: Register a new user
      tags:
        - auth
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                role:
                  type: string
                  enum: [ADMIN, EDITOR, VIEWER]
            example:
              email: sameemamjadarsu@gmail.com
              password: Sameem@123
              role: ADMIN
      responses:
        '201':
          description: User registered successfully
          headers:
            Access-Control-Allow-Origin:
              schema:
                type: string
              example: '*'
            Content-Security-Policy:
              schema:
                type: string
              example: "default-src 'self'; base-uri 'self'; font-src 'self' https: data:; form-action 'self'; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests"
            Cross-Origin-Opener-Policy:
              schema:
                type: string
              example: same-origin
            Cross-Origin-Resource-Policy:
              schema:
                type: string
              example: same-origin
            Origin-Agent-Cluster:
              schema:
                type: string
              example: '?1'
            Referrer-Policy:
              schema:
                type: string
              example: no-referrer
            Strict-Transport-Security:
              schema:
                type: string
              example: max-age=15552000; includeSubDomains
            X-Content-Type-Options:
              schema:
                type: string
              example: nosniff
            X-DNS-Prefetch-Control:
              schema:
                type: string
              example: 'off'
            X-Download-Options:
              schema:
                type: string
              example: noopen
            X-Frame-Options:
              schema:
                type: string
              example: SAMEORIGIN
            X-Permitted-Cross-Domain-Policies:
              schema:
                type: string
              example: none
            X-XSS-Protection:
              schema:
                type: integer
              example: 0
            Content-Length:
              schema:
                type: integer
              example: 204
            ETag:
              schema:
                type: string
              example: W/"cc-+7iTYTcDiSdBkIqz+4ugfjUUF/g"
            Date:
              schema:
                type: string
              example: Mon, 05 Jan 2026 22:10:46 GMT
            Connection:
              schema:
                type: string
              example: keep-alive
            Keep-Alive:
              schema:
                type: string
              example: timeout=5

  /auth/verify-email:
    post:
      summary: Verify email
      tags:
        - auth
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                otp:
                  type: string
            example:
              email: sameemamjadarsu@gmail.com
              otp: '476259'
      responses:
        '200':
          description: Email verified successfully
          headers:
            Access-Control-Allow-Origin:
              schema:
                type: string
              example: '*'
            Content-Security-Policy:
              schema:
                type: string
              example: "default-src 'self'; base-uri 'self'; font-src 'self' https: data:; form-action 'self'; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests"

  /auth/login:
    post:
      summary: Login user
      tags:
        - auth
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
            example:
              email: sameemamjadarsu@gmail.com
              password: Sameem@123
      responses:
        '200':
          description: User logged in successfully
          headers:
            Access-Control-Allow-Origin:
              schema:
                type: string
              example: '*'

  /auth/refresh:
    post:
      summary: Refresh token API
      tags:
        - auth
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                token:
                  type: string
            example:
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      responses:
        '200':
          description: Token refreshed successfully
          headers:
            Access-Control-Allow-Origin:
              schema:
                type: string
              example: '*'

  /articles/:
    get:
      summary: Get articles
      tags:
        - Article
      parameters:
        - name: page
          in: query
          schema:
            type: integer
          example: 1
        - name: limit
          in: query
          schema:
            type: integer
          example: 10
      responses:
        '200':
          description: Articles list
          headers:
            Access-Control-Allow-Origin:
              schema:
                type: string
              example: '*'
      security:
        - BearerAuth: []

  /articles:
    post:
      summary: Create a new article
      tags:
        - Article
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                content:
                  type: string
                state:
                  type: string
                  enum: [PUBLISHED, DRAFT]
            example:
              title: First Article About Life
              content: This is beautiful life, appreciate it
              state: PUBLISHED
      responses:
        '201':
          description: Article created
      security:
        - BearerAuth: []

  /articles/{articleId}:
    put:
      summary: Edit article
      tags:
        - Article
      parameters:
        - name: articleId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                content:
                  type: string
                state:
                  type: string
                  enum: [PUBLISHED, DRAFT]
            example:
              title: First Article Of Life Edited
              content: Life is beautiful, please appreciate it
              state: PUBLISHED
      responses:
        '200':
          description: Article updated
      security:
        - BearerAuth: []

    delete:
      summary: Delete article
      tags:
        - Article
      parameters:
        - name: articleId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Article deleted
      security:
        - BearerAuth: []

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer

`