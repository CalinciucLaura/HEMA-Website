const db = require("../databaseSetup.js");

async function getYourCollection(id_user) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT name, description from plantAbout p JOIN collection c ON p.id = c.id_plant JOIN users u ON u.id = c.id_user WHERE id_user = ?`,
      [id_user],
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function getPopularity() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT name, color, type, category, conditions, season, description, COUNT(c.id_plant) AS appearance_count from plantAbout p JOIN collection c ON p.id = c.id_plant GROUP BY c.id_plant ORDER BY appearance_count DESC LIMIT 8 `,
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}

function generateRssXml(rssFeed, items) {
  const xmlItems = items
    .map((item) => {
      return `
        <item>
          <name>${escapeXml(item.name)}</name>
          <top>${escapeXml(item.top)}</top>
          <category>${escapeXml(item.category)}</category>
          <type>${escapeXml(item.type)}</type>
          <season>${escapeXml(item.season)}</season>
          <color>${escapeXml(item.color)}</color>
          <description>${escapeXml(item.description)}</description>
          <language>${escapeXml(item.language)}</language>
          <pubDate>${escapeXml(item.pubDate)}</pubDate>
        </item>
      `;
    })
    .join("");

  const rssXml = `
    <rss version="2.0">
      <channel>
        <title>${escapeXml(rssFeed.TITLE)}</title>
        <description>${escapeXml(rssFeed.description)}</description>
        <language>${escapeXml(rssFeed.language)}</language>
        <lastBuildDate>${escapeXml(rssFeed.lastBuildDate)}</lastBuildDate>
        ${xmlItems}
      </channel>
    </rss>
  `;

  return rssXml;
}

function escapeXml(unsafe) {
  if (typeof unsafe !== "string") {
    return unsafe;
  }
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

module.exports = {
  getYourCollection: getYourCollection,
  getPopularity: getPopularity,
  generateRssXml: generateRssXml,
};
