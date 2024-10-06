export const getFont = (type = '') => {
  const fullType = type === 'BL' ? 'Black' : type === 'BO' ? 'BOLD' : type === 'M' ? 'Medium' : type === 'R' ? 'Regular' : ''
  return 'Roboto-' + fullType
}

const user1Image = `https://media.licdn.com/dms/image/v2/C4E03AQGbrv8PQCksSg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1523557132085?e=1733961600&v=beta&t=P5Sj4MnukmDX6UaHNlPGZ1fXhwapTEJj8oKZercf7bc`
const user2Image = `https://media.licdn.com/dms/image/v2/D5603AQGTLSXGJ6Y1dA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1681199027964?e=1733961600&v=beta&t=PE32st9mPDe9P8NEttxZMk3QaJlh4Pq1i4b3up2sfN8`
const user3Image = `https://media.licdn.com/dms/image/v2/C5603AQG8QHW3-SwgWw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1516579599814?e=1733961600&v=beta&t=id9QqS2hnlE0HSxgeLuLaygSOoF0mJYJxf7fkYbQ4CU`

export const getUserImage = (name) => {
  const img = name === 'user1' ? user1Image : name === 'user2' ? user2Image : user3Image
  return img
}
