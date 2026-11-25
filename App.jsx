import { useState } from "react";
import "./App.css";

const foodItems = [
  { id: 1, name: "Chicken Biryani", category: "Biryani", price: 180, image: "/chicken-biryani.jpg" },
  { id: 2, name: "Veg Fried Rice", category: "Rice & Noodles", price: 140, image: "/veg-fried-rice.jpg" },
  { id: 3, name: "Masala Dosa", category: "Breakfast", price: 90, image: "/masala-dosa.jpg" },
  { id: 4, name: "Paneer Butter Masala", category: "Main Course", price: 190, image: "/paneer-butter-masala.jpg" },
  { id: 5, name: "Chicken 65", category: "Starters", price: 160, image: "/chicken-65.jpg" },
  { id: 6, name: "Butter Naan", category: "Breads", price: 40, image: "/butter-naan.jpg" },
  { id: 7, name: "South Indian Meals", category: "Main Course", price: 150, image: "/south-indian-meals.jpg" },
  { id: 8, name: "Gulab Jamun", category: "Desserts", price: 70, image: "/gulab-jamun.jpg" },
];

const initialOrders = [
  { id: "#QP1024", customer: "Arun Kumar", items: "Chicken Biryani × 2", total: 360, status: "Pending", time: "10:30 AM" },
  { id: "#QP1025", customer: "Priya", items: "Masala Dosa × 1", total: 90, status: "Preparing", time: "10:35 AM" },
  { id: "#QP1026", customer: "Rahul", items: "Chicken 65 × 1", total: 160, status: "Ready", time: "10:40 AM" },
  { id: "#QP1027", customer: "Divya", items: "Veg Fried Rice × 2", total: 280, status: "Completed", time: "10:45 AM" },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [orders, setOrders] = useState(initialOrders);
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(foodItems.map((item) => item.category))];

  const filteredFoods =
    category === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === category);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const pendingCount = orders.filter((order) => order.status === "Pending").length;
  const completedCount = orders.filter((order) => order.status === "Completed").length;
  const revenue = orders
    .filter((order) => order.status === "Completed")
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">Q</div>
          <div>
            <h2>Quick Pickup</h2>
            <p>OWNER PANEL</p>
          </div>
        </div>

        <p className="nav-heading">MAIN MENU</p>

        <nav className="navigation">
          {["Dashboard", "Menu", "Orders"].map((page) => (
            <button
              key={page}
              className={`nav-link ${activePage === page ? "active" : ""}`}
              onClick={() => setActivePage(page)}
            >
              <span>
                {page === "Dashboard" ? "▦" : page === "Menu" ? "☷" : "▤"}
              </span>
              {page === "Orders" ? "Order Management" : page === "Menu" ? "Food Menu" : page}
              {page === "Orders" && <span className="nav-count">{pendingCount}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="restaurant-card">
            <div className="restaurant-avatar">R</div>
            <div>
              <strong>Royal Restaurant</strong>
              <p>Restaurant Owner</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="welcome-text">Welcome back!</p>
            <h1>{activePage === "Orders" ? "Order Management" : activePage === "Menu" ? "Food Menu" : "Dashboard"}</h1>
          </div>
          <div className="topbar-right">
            <span className="online-dot"></span>
            <span>Restaurant Online</span>
            <div className="profile-circle">R</div>
          </div>
        </header>

        {activePage === "Dashboard" && (
          <section>
            <div className="page-intro">
              <div>
                <h2>Restaurant Overview</h2>
                <p>Here's what's happening at your restaurant today.</p>
              </div>
              <span className="date-label">Today's Overview</span>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon orange">▤</div>
                <p>Total Orders</p>
                <h2>{orders.length}</h2>
                <small>Orders received</small>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">₹</div>
                <p>Completed Revenue</p>
                <h2>₹{revenue}</h2>
                <small>From completed orders</small>
              </div>
              <div className="stat-card">
                <div className="stat-icon yellow">◷</div>
                <p>Pending Orders</p>
                <h2>{pendingCount}</h2>
                <small>Need your attention</small>
              </div>
              <div className="stat-card">
                <div className="stat-icon blue">✓</div>
                <p>Completed Orders</p>
                <h2>{completedCount}</h2>
                <small>Successfully completed</small>
              </div>
            </div>

            <div className="section-heading">
              <div>
                <h2>Recent Orders</h2>
                <p>Keep track of your latest orders.</p>
              </div>
              <button className="outline-button" onClick={() => setActivePage("Orders")}>
                View All Orders →
              </button>
            </div>

            <div className="table-card">
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 4).map((order) => (
                      <tr key={order.id}>
                        <td className="order-id">{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.items}</td>
                        <td>₹{order.total}</td>
                        <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activePage === "Menu" && (
          <section>
            <div className="page-intro">
              <div>
                <h2>Manage Your Food Menu</h2>
                <p>Explore your restaurant's food items and prices.</p>
              </div>
              <span className="date-label">{foodItems.length} Food Items</span>
            </div>

            <div className="category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "category-button selected" : "category-button"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="food-grid">
              {filteredFoods.map((food) => (
                <article className="food-card" key={food.id}>
                  <div className="food-image">
                    <img src={food.image} alt={food.name} />
                    <span className="food-category">{food.category}</span>
                  </div>
                  <div className="food-details">
                    <h3>{food.name}</h3>
                    <div className="food-bottom">
                      <strong>₹{food.price}</strong>
                      <span className="available-label">● Available</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activePage === "Orders" && (
          <section>
            <div className="page-intro">
              <div>
                <h2>Manage Customer Orders</h2>
                <p>Track orders and update their preparation status.</p>
              </div>
              <span className="date-label">{orders.length} Total Orders</span>
            </div>

            <div className="order-summary">
              <div><span>All Orders</span><strong>{orders.length}</strong></div>
              <div><span>Pending</span><strong>{pendingCount}</strong></div>
              <div><span>Completed</span><strong>{completedCount}</strong></div>
            </div>

            <div className="table-card">
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Time</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="order-id">{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.items}</td>
                        <td>{order.time}</td>
                        <td>₹{order.total}</td>
                        <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                        <td>
                          <select
                            className="status-select"
                            value={order.status}
                            onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                          >
                            <option>Pending</option>
                            <option>Preparing</option>
                            <option>Ready</option>
                            <option>Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <footer className="footer">
          <p>© 2026 Quick Pickup · Hotel Owner Panel</p>
        </footer>
      </main>
    </div>
  );
}

export default App;