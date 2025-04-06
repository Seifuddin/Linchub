from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# 🔗 Remote Database connection (update these values)
db = mysql.connector.connect(
    host="sql7.freesqldatabase.com",     # <-- replace with your DB host
    user="sql7771691",            # <-- replace with your DB username
    password="PvMsXEv6BW",        # <-- replace with your DB password
    database="sql7771691",            # <-- replace with your DB name
    port=3306                           # optional, 3306 is default
)

cursor = db.cursor()

@app.route('/')
def home():
    return jsonify({"message": "Flask Backend is Running with Remote DB!"})

# ➕ Add a computer
@app.route('/add_computer', methods=['POST'])
def add_computer():
    data = request.json
    try:
        cursor.execute(
            "INSERT INTO computers (brand, name, processor, ram, capacity, shelf, serial) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (data['brand'], data['name'], data['processor'], data['ram'], data['capacity'], data['shelf'], data['serial'])
        )
        db.commit()
        return jsonify({"message": "Computer added successfully!"})
    except mysql.connector.IntegrityError as e:
        if "Duplicate entry" in str(e):
            return jsonify({"error": "Serial number already exists!"}), 400
        return jsonify({"error": str(e)}), 500

# 🔍 Search for computers by name     
@app.route('/search_computers', methods=['GET'])
def search_computers():
    name = request.args.get('name', '')
    cursor.execute("SELECT id, brand, name, processor, ram, capacity, shelf, serial FROM computers WHERE name LIKE %s", ('%' + name + '%',))
    results = cursor.fetchall()

    computers = []
    for row in results:
        computers.append({
            "id": row[0],
            "brand": row[1],
            "name": row[2],
            "processor": row[3],
            "ram": row[4],
            "capacity": row[5],
            "shelf": row[6],
            "serial": row[7]
        })

    return jsonify(computers)

# ❌ Delete a computer and move to sold_laptops
@app.route("/delete_computer/<int:comp_id>", methods=["DELETE"])
def delete_computer(comp_id):
    try:
        cursor.execute("SELECT brand, name, processor, ram, capacity, serial FROM computers WHERE id = %s", (comp_id,))
        computer = cursor.fetchone()

        if not computer:
            return jsonify({"error": "Computer not found"}), 404

        cursor.execute(
            "INSERT INTO sold_laptops (brand, name, processor, ram, capacity, serial, sold_date) VALUES (%s, %s, %s, %s, %s, %s, NOW())",
            (computer[0], computer[1], computer[2], computer[3], computer[4], computer[5])
        )
        db.commit()

        cursor.execute("DELETE FROM computers WHERE id = %s", (comp_id,))
        db.commit()

        return jsonify({"message": "Computer moved to sold laptops and deleted from computers"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 📦 Get all sold laptops
@app.route("/sold_laptops", methods=["GET"])
def get_sold_laptops():
    cursor.execute("SELECT id, brand, name, serial, processor, ram, capacity, sold_date FROM sold_laptops")
    sold_laptops = cursor.fetchall()

    laptops = []
    for laptop in sold_laptops:
        formatted_date = laptop[7].strftime("%Y-%m-%d %H:%M:%S") if laptop[7] else "Unknown"
        laptops.append({
            "id": laptop[0],
            "brand": laptop[1],
            "name": laptop[2],
            "serial": laptop[3],
            "processor": laptop[4],
            "ram": laptop[5],
            "capacity": laptop[6],
            "sold_date": formatted_date
        })

    return jsonify(laptops)

if __name__ == '__main__':
    from os import getenv
    app.run(debug=getenv('FLASK_DEBUG', False))