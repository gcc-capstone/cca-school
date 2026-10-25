# Pigeon Connect – UI Prototype (V2)

Temporary, front-end-only prototype (React + TypeScript + Bootstrap 5.3.8). No backend: all data is hardcoded and every change is held in browser memory only, so reloading the page restores the original dummy data.

## Run

```bash
npm install
npm run dev
```

## Demo accounts (any username/password works)

- Parent: Maya Thompson (children: Liam, Ava)
- Teacher: Mr. Daniel Rivera (lands on My Classes)
- Administrator: Dr. Patricia Nguyen
- IT Super Admin: hidden login at `/#/it-login` (not linked anywhere)

## V2 changes

See the change list in the project hand-off notes. The old style-reference page is still available at `/#/style` but is no longer linked.

## Round 3 changes
- Appearance (palette, custom colors, Match device / Light / Dark, text size) now lives in **Profile**, saved per account. Default mode follows the device theme.
- Landing page: three thin role tiles. IT Super Admin sign-in is hidden at `/#/it-login`.
- IT Super Admin: Database + Archive only. Archive = **Save database file** (JSON download) + **Prepare for new year** (removes announcements, messages, transport changes; confirm step).
- Teacher: class roster as a list; "Text parents" (private messages, not announcements); transportation rows link to a text to the parent; wider message search.
- Administrator: Classes (filters, teacher + students list, message teacher / parent), Students (message parent), Staff (message teachers/admins), Messages inbox.
- All data is in-memory and resets on reload.

## Round 4 changes
- Landing: the three roles are an equal-width list with icons.
- Print is only on an announcement's detail page (removed from Profile).
- Teachers and admins have Contact preferences in Profile (per account). Emergency contacts stay parent-only.
- Admin: opening a class lists its previous announcements (teacher announcements sent to a class are tied to it).
- Teacher: Messages has a **New message** button opening a popup with My students (grouped by class, class filter, search) and School staff (grouped Administrators / Teachers, role filter, search).
