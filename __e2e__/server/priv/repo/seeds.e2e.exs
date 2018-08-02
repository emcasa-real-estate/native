alias Re.{
  Image,
  Address,
  Listing,
  User,
  Repo
}

alias Comeonin.Bcrypt

Repo.delete_all(Image)
Repo.delete_all(Listing)
Repo.delete_all(Address)
Repo.delete_all(User)

{:ok, user} =
  Repo.insert(%User{
    name: "Some Person",
    email: "foo@example.com",
    password_hash: Bcrypt.hashpwsalt("password"),
    role: "admin",
    confirmed: true
  })

{:ok, address} =
  Repo.insert(%Address{
    street: "Some Street",
    street_number: "123",
    neighborhood: "Copacabana",
    city: "Rio de Janeiro",
    state: "RJ",
    postal_code: "33333-333",
    lat: -15.101,
    lng: -5.101
  })

for _ <- 0..30 do
  {:ok, image} =
    Repo.insert(%Image{
      filename: "vqtf0mef5i9vvahbzt7n.jpg",
      position: 0,
      is_active: true
    })

  {:ok, _} =
    Repo.insert(%Listing{
      type: "Apartamento",
      description: "A description about the listing.",
      matterport_code: "hQ6T2Q3pVL3",
      floor: "1",
      price: Enum.random(1..5) * 1_000_000,
      area: 100,
      rooms: 2,
      bathrooms: 2,
      garage_spots: 1,
      score: Enum.random(3..5),
      user: user,
      address: address,
      images: [image]
    })
end
