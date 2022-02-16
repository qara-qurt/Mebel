import axios from 'axios'

const url = ''

export const profileAPI = {
    getProfileUserId(userId){
        return instance.get<ProfileType>(url)
        .then(response=>response.data)
    }
}

