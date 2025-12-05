<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

$country = isset($_GET['country']) ? $_GET['country'] : '';
$lookup = isset($_GET['lookup']) ? $_GET['lookup'] : '';

if ($lookup === 'cities') {
    if (!empty($country)) {
        $stmt = $conn->prepare("
            SELECT cities.name, cities.district, cities.population 
            FROM cities 
            JOIN countries ON cities.country_code = countries.code 
            WHERE countries.name LIKE :country
        ");
        $stmt->execute(['country' => "%$country%"]);
    } else {
        $stmt = $conn->query("SELECT name, district, population FROM cities");
    }

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    ?>
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>District</th>
            <th>Population</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($results as $row): ?>
            <tr>
                <td><?= $row['name']; ?></td>
                <td><?= $row['district']; ?></td>
                <td><?= $row['population']; ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php
} else {
    if (!empty($country)) {
        $stmt = $conn->prepare("SELECT * FROM countries WHERE name LIKE :country");
        $stmt->execute(['country' => "%$country%"]);
    } else {
        $stmt = $conn->query("SELECT * FROM countries");
    }

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    ?>
    <table>
        <thead>
        <tr>
            <th>Country Name</th>
            <th>Continent</th>
            <th>Independence Year</th>
            <th>Head of State</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($results as $row): ?>
            <tr>
                <td><?= $row['name']; ?></td>
                <td><?= $row['continent']; ?></td>
                <td><?= $row['independence_year']; ?></td>
                <td><?= $row['head_of_state']; ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php
}
?>

