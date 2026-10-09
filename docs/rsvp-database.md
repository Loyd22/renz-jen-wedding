# Simplified RSVP and Firestore setup

The form collects Full Name, attendance, and the required confirmation checkbox.
Each person should submit their own response. An accepted response counts as one
guest; a declined response counts as zero.

## Stored documents

Continue using the existing `rsvpSubmissions` collection. New documents contain:

| Field | Type | Value |
| --- | --- | --- |
| `fullName` | string | Trimmed name, 2–120 characters |
| `normalizedFullName` | string | Lowercase name with collapsed spaces |
| `attendance` | string | `attending` or `declined` |
| `guestCount` | integer | Automatically `1` for attending or `0` for declined |
| `agreementAccepted` | boolean | Must be `true` |
| `createdAt` | timestamp | Firestore server timestamp |
| `updatedAt` | timestamp | Firestore server timestamp |

Email, phone, guest names, and message are no longer written. You do not need to
create columns or manually add these fields: Firestore is schemaless.
Do not delete existing responses. The admin table displays the seven current
fields plus the Delete action. Older guest counts and additional guest names
remain supported for totals and the printable attendee list. Timestamps in the
table use Philippine time (Asia/Manila).

## Update the live rules

The project's live rules are not included in this repository and have not been
changed. In **Firebase Console → Firestore Database → Rules**, locate the
`match /rsvpSubmissions/{...}` block.

Update its create validation to accept the fields above instead of requiring
email, phone, additional guests, or message. For a public RSVP form, this is a
create-only validation clause you can use inside that existing collection block:

```text
allow create: if
  request.resource.data.keys().hasAll([
    'fullName', 'normalizedFullName', 'attendance', 'guestCount',
    'agreementAccepted', 'createdAt', 'updatedAt'
  ]) &&
  request.resource.data.keys().hasOnly([
    'fullName', 'normalizedFullName', 'attendance', 'guestCount',
    'agreementAccepted', 'createdAt', 'updatedAt'
  ]) &&
  request.resource.data.fullName is string &&
  request.resource.data.fullName.size() >= 2 &&
  request.resource.data.fullName.size() <= 120 &&
  request.resource.data.fullName.matches('.*[^\\s].*') &&
  request.resource.data.normalizedFullName is string &&
  request.resource.data.normalizedFullName.size() >= 2 &&
  request.resource.data.normalizedFullName.size() <= 120 &&
  request.resource.data.attendance in ['attending', 'declined'] &&
  request.resource.data.guestCount is int &&
  request.resource.data.guestCount ==
    (request.resource.data.attendance == 'attending' ? 1 : 0) &&
  request.resource.data.agreementAccepted == true &&
  request.resource.data.createdAt == request.time &&
  request.resource.data.updatedAt == request.time;
```

Keep your existing admin-only read/update/delete permissions and any additional
access restrictions. If your current create rule also checks authentication or
another access condition, retain that condition alongside this field validation.
Replace the old create validation; do not merely add another rule alongside a
broader `allow write` condition, since any matching allow grants access.

Publish the updated rules together with the updated website. An old cached form
sending removed fields will be rejected by the strict field list above and needs
to be refreshed. No collection migration or new index is required for the current
admin query, which still orders documents by `createdAt`.

## Verify after publishing

Local regression checks: `node --test tests/rsvp.test.mjs`. These use a mocked
database and do not submit real responses or validate your deployed rules.

1. Submit an attending response with a full name and checked confirmation.
2. Confirm the new Firestore document has the seven fields above and `guestCount: 1`.
3. Submit a declined response and verify `guestCount: 0`.
4. Confirm blank names and an unchecked confirmation cannot be submitted.
5. Open the admin dashboard and verify the responses, counts, and printable list.
6. Remove only your test responses through your authorized admin/console access.

The form still creates a new document per submission; it does not deduplicate
names. Older responses with multiple guests retain their existing counts.

Reference: [Firebase field validation and schemaless documents](https://firebase.google.com/docs/firestore/security/rules-fields).
