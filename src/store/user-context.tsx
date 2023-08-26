import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface User {
  averageGuessTime: number;
  averageTakes: number;
  createdAt: Date;
  curCorrectLetters: string;
  gamesWon: number;
  hasPlayedToday: boolean;
  isOnStreak: boolean;
  leastTakes: number;
  lives: number;
  streak: number;
  id: number;
  hasStartedToday: boolean;
}

export type ContextDefaults = {
  user: User | undefined,
};

const contextDefaults = {
  user: undefined
};

export const UserContext =
  React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check local storage to see if user is new
    const userId = localStorage.getItem('userId');

    // if no id saved in local storage, initiate user
    if (!userId) {
      console.log('Welcome, new user!');

      const createUser = async () => {
        const { data, error } = await supabase.from('user').insert({ created_at: new Date() }).select();

        if (!data || error) {
          // TODO HANDLE ERROR STATE
          console.log(error?.message);
          return;
        }

        localStorage.setItem('userId', data[0].user_id);
      };

      createUser();

    } // if user has id saved in local storage, find user in database and load in
    else {
      const fetchUser = async () => {
        const { data, error } = await supabase.from('user').select().eq('user_id', userId);

        // TODO if userId but no data in DB, account no longer exists (error?), create a new one
        if (!data?.length) {
          return;
        }

        // else load the user into the program
        const {
          user_id: uid,
          created_at: createdAt,
          cur_correct_letters: curCorrectLetters,
          games_won: gamesWon,
          has_played_today: hasPlayedToday,
          is_on_streak: isOnStreak,
          least_takes: leastTakes,
          lives,
          streak,
          has_started_today: hasStartedToday,
          average_guess_time: averageGuessTime,
          average_takes: averageTakes
        } = data[0];

        setUser({
          id: uid,
          createdAt,
          curCorrectLetters,
          gamesWon,
          hasPlayedToday,
          isOnStreak,
          leastTakes,
          lives,
          streak,
          hasStartedToday,
          averageGuessTime,
          averageTakes
        });
      };

      fetchUser();
    }
  }, []);

  const contextValue = {
    user
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;