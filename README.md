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
NAME=inno
API_PORT=8221
WEB_PORT=80
POSTGRESQL_PASS=password
DATA_PATH=./data
VITE_API_URL=http://localhost:8221/
                </pre>
                2. <code>make dev</code>
            </td>
            <td>
                1. Configure `.env`
                <pre>
NAME=inno
API_PORT=8221
WEB_PORT=8222
POSTGRESQL_PASS=password
DATA_PATH=~/data/inno
VITE_API_URL=https://inno.chill.services/api/
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
