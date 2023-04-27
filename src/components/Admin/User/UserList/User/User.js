import { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import { fn } from "@/utils";

const NOT_FOUND_IMG = "/images/not-found.jpg";

export function User(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(NOT_FOUND_IMG);
  const isAdmin = user.userStatus === 0;

  useEffect(() => {
    const imageUrl = fn.getUrlImage(user.userUUID);

    fn.checkIfImageExists(imageUrl, (exists) => {
      if (exists) setAvatar(imageUrl);
    });
  }, [user]);

  return (
    <>
      <Table.Cell width={1}>
        <Image src={avatar} alt={user.userEmail} avatar />
      </Table.Cell>
      <Table.Cell>{user.userEmail}</Table.Cell>
      <Table.Cell>
        <Icon
          name={isAdmin ? "check" : "close"}
          color={isAdmin ? "green" : "red"}
        />
      </Table.Cell>
    </>
  );
}
