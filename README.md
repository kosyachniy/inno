# The App
## Run
<table>
    <thead>
        <tr>
            <th>local</th>
            <th>prod</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                1. Configure `.env`
                <pre>
NAME=proj_name
API_PORT=8123
WEB_PORT=8987
POSTGRESQL_PASS=password
SERVER=http://localhost:8123/
                </pre>
                2. <code>make dev</code>
            </td>
            <td>
                1. Configure `.env`
                <pre>
NAME=proj_name
API_PORT=8123
WEB_PORT=8987
POSTGRESQL_PASS=password
SERVER=/api/
HOST=subdomain.domain.com
                </pre>
                2. <code>make run</code>
            </td>
        </tr>
    </tbody>
</table>

## Vision
1. Code best practices
2. Simplicity
3. Minimalism
4. Speed
5. New solutions
