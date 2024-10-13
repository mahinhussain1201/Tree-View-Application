<h1>Tree View Application</h1><br/>
<h3>RUNNING ON LOCAL SERVER</h3><br/>
<p>Follow the commands: <br/>
https://github.com/mahinhussain1201/Tree-View-Application.git<br/>
cd client<br/>
npm install<br/>
npm start<br/>
ON ANOTHER TERMINAL WINDOW : cd api<br/>
npm install<br/>
npm run server</p>
<br/>
<h3>FOR DOCKER</h3><br/>
<p>docker login<br/>
docker pull mahinhussain1201/tree_view_application:client<br/>
docker pull mahinhussain1201/tree_view_application:api<br/>
docker-compose up<br/>
Visit:http://localhost:3000/</p>
<br/>
<p>HOSTED LINK: https://tree-view-application-livid.vercel.app/</p>
<br/>
<p>Test Credentials:<br/>
email:test@test.com <br/>
password:test</p>
<br/>
<h3>Overview</h3><br/>
<p>The Tree View Application is designed to manage and display a hierarchical view of godowns (warehouses) and their respective items. It enables users to search for items across multiple godowns, view item details, and even move items between godowns.
<br/>
The application is built using the <b>MERN stack</b> (MongoDB, Express.js, React, Node.js) and Docker for easier deployment.</p><br/>
<h3>Project Goals</h3><br/>
<ul>
<li>Create a user-friendly tree view interface for managing godowns and their items.</li>
<li>Implement search and filter functionalities to help users find specific items.
</li>
<li>Enable pagination for improved user experience when browsing large inventories.</li>
<li>Ensure the application is scalable and easy to deploy using Docker.</li>
</ul>