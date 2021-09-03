import { IRelationship } from "@/interfaces/api/v2/relationship.interface";
import {
  ICredential,
  ICredentialDisplayType,
} from "@/interfaces/api/v4/credential.interface";
import { selectFirstAttrItem } from "./attribute-filter";
import { getRelationshipName, isCredential } from "./entity";


export function credOrRelationshipToCredView(
  item: ICredential | IRelationship
): ICredentialDisplayType {
  const display: ICredentialDisplayType = {
    id:0,
    credential_type: "",
    type: "",
    authority: "",
    authorityLink: "",
    date_effective: new Date(),
    revoked: false,
    value: "",
  };
  if (isCredential(item)) {
    const credItem = item as ICredential;
    display.id = credItem.id;
    display.authority = credItem.credential_type.issuer.name;
    display.authorityLink = credItem.credential_type.issuer.url;
    display.type = credItem.names[0]?.type;
    display.credential_type = credItem.credential_type.description;
    display.date_effective = credItem.effective_date;
    display.registration_reason = selectFirstAttrItem(
      { key: "type", value: "reason_description" },
      credItem.attributes
    )?.value as string | undefined;
    display.revoked = credItem.revoked;
    display.revoked_date = credItem.revoked_date;
    display.value = credItem.names[0]?.text;
  } else {
    const relItem = item as IRelationship;
    display.id = relItem.credential.id
    // display.authority = relItem.credential.credential_type.issuer.name
    display.authority = "BC Corporate Registry";
    //display.authorityLink = relItem.credential.credential_type.issuer.url
    display.authorityLink = "#";
    display.credential_type = relItem.credential.credential_type.description;
    //display.type = relItem.related_topic.names[0]?.type
    display.type = "entity_name";
    display.date_effective = relItem.credential.effective_date;
    display.revoked = relItem.credential.revoked;
    display.revoked_date = relItem.credential.revoked_date;
    display.relationship_types = relItem.attributes.map((attr) => attr.value);
    display.value = getRelationshipName(relItem);
  }
  return display;
}

