# The App
## Run
1. Configure ` .env `
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
                <pre>
NAME=proj_name
API_PORT=8123
APP_PORT=8987
POSTGRESQL_PASS=password
SERVER=http://localhost:8123/
                </pre>
            </td>
            <td>
                <pre>
NAME=proj_name
API_PORT=8123
APP_PORT=8987
POSTGRESQL_PASS=password
SERVER=/api/
HOST=subdomain.domain.com
                </pre>
            </td>
        </tr>
    </tbody>
</table>
2. ` make run `
