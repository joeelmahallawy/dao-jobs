// import { supabase } from '../../lib/supabase'

import { supabase } from '../../lib/supabase'

const handler = (req, res) => {
    supabase.auth.api.setAuthCookie(req, res)
}
export default handler
// export default async function handler(req, res) {
//     const user = await supabase.auth.user()
//     return res.status(200).json({ user })
// }
