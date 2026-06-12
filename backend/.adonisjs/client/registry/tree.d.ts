/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  account: {
    profile: {
      show: typeof routes['account.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['account.access_tokens.destroy']
    }
  }
  users: {
    users: {
      index: typeof routes['users.users.index']
      update: typeof routes['users.users.update']
      destroy: typeof routes['users.users.destroy']
    }
  }
}
